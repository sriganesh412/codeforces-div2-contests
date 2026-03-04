import axios from 'axios';

export interface Contest {
  id: number;
  name: string;
  phase: string;
}

export interface Problem {
  contestId: number;
  index: string;
}

export interface Submission {
  verdict: string;
  problem: Problem;
}

const API_BASE_URL = 'https://codeforces.com/api';

export const codeforces = {
  fetchContests: async (): Promise<Contest[]> => {
    const res = await axios.get(`${API_BASE_URL}/contest.list`);
    if (res.data.status === 'OK') {
      const filteredContests = res.data.result.filter(
        (contest: Contest) => contest.name.includes('Div. 2') && contest.phase === 'FINISHED'
      );
      return filteredContests.slice(0, 100);
    }
    throw new Error(res.data.comment || 'Failed to fetch contests');
  },

  fetchUserSubmissions: async (userHandle: string): Promise<Record<string, boolean>> => {
    const res = await axios.get(`${API_BASE_URL}/user.status?handle=${userHandle}`);
    if (res.data.status === 'OK') {
      const submissions: Submission[] = res.data.result;
      const solvedProblems: Record<string, boolean> = {};
      submissions.forEach(submission => {
        if (submission.verdict === 'OK') {
          const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;
          solvedProblems[problemKey] = true;
        }
      });
      return solvedProblems;
    }
    throw new Error(res.data.comment || 'Failed to fetch user submissions');
  }
};
