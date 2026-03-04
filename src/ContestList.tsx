import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { codeforces, Contest } from './codeforces';
import './ContestList.css';

const ContestList: React.FC = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [handle, setHandle] = useState<string>('');
  const [userSubmissions, setUserSubmissions] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContests();
    const savedHandle = localStorage.getItem('codeforcesHandle');
    if (savedHandle) {
      setHandle(savedHandle);
      loadUserSubmissions(savedHandle, false);
    }
  }, []);

  const loadContests = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedContests = await codeforces.fetchContests();
      setContests(fetchedContests);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching contests');
      toast.error('Failed to load contests');
    } finally {
      setLoading(false);
    }
  };

  const loadUserSubmissions = async (userHandle: string, showToast: boolean = true) => {
    setIsSubmitting(true);
    const loadingToastId = showToast ? toast.loading(`Fetching data for ${userHandle}...`) : undefined;
    
    try {
      const solvedProblems = await codeforces.fetchUserSubmissions(userHandle);
      setUserSubmissions(solvedProblems);
      if (showToast && loadingToastId) {
        toast.success(`Successfully loaded data for ${userHandle}`, { id: loadingToastId });
      }
    } catch (err: any) {
      setUserSubmissions({});
      if (showToast && loadingToastId) {
        toast.error(`Failed to fetch stats for handle "${userHandle}". Please check if it exists.`, { id: loadingToastId });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedHandle = handle.trim();
    if (trimmedHandle === '') {
      toast.warning('Please enter a valid handle');
      return;
    }

    localStorage.setItem('codeforcesHandle', trimmedHandle);
    await loadUserSubmissions(trimmedHandle, true);
  };

  const isProblemSolved = (contestId: number, problemIndex: string): boolean => {
    return !!userSubmissions[`${contestId}-${problemIndex}`];
  };

  if (loading) {
    return <div className="loading-state">Loading Contests...</div>;
  }

  if (error) {
    return (
      <div className="error-state">
        <p>{error}</p>
        <button onClick={loadContests} className="submit-button">Retry</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Codeforces Division 2 Contests</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <input 
          type="text" 
          value={handle} 
          onChange={(e) => setHandle(e.target.value)} 
          placeholder="Enter Codeforces Handle" 
          className="input-field"
          disabled={isSubmitting}
        />
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
      </form>

      <h3>Contest List</h3>
      <table className="contest-table">
        <thead>
          <tr>
            <th>Contest Name</th>
            <th>Problem A</th>
            <th>Problem B</th>
            <th>Problem C</th>
            <th>Problem D</th>
          </tr>
        </thead>
        <tbody>
          {contests.map(contest => (
            <tr key={contest.id}>
              <td>{contest.name}</td>
              <td className={isProblemSolved(contest.id, 'A') ? 'solved' : ''}>
                <a href={`https://codeforces.com/contest/${contest.id}/problem/A`} target="_blank" rel="noreferrer">
                  Problem A
                </a>
              </td>
              <td className={isProblemSolved(contest.id, 'B') ? 'solved' : ''}>
                <a href={`https://codeforces.com/contest/${contest.id}/problem/B`} target="_blank" rel="noreferrer">
                  Problem B
                </a>
              </td>
              <td className={isProblemSolved(contest.id, 'C') ? 'solved' : ''}>
                <a href={`https://codeforces.com/contest/${contest.id}/problem/C`} target="_blank" rel="noreferrer">
                  Problem C
                </a>
              </td>
              <td className={isProblemSolved(contest.id, 'D') ? 'solved' : ''}>
                <a href={`https://codeforces.com/contest/${contest.id}/problem/D`} target="_blank" rel="noreferrer">
                  Problem D
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContestList;
