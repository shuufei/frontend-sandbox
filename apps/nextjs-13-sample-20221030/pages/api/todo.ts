import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  runtime: 'experimental-edge',
};

const sleep = (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      return resolve();
    }, ms);
  });
};
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
export const data: Todo[] = [
  {
    id: 1,
    title: 'hoge',
    completed: true,
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  switch (req.method) {
    case 'GET':
      await sleep(1000);
      res.status(200).json({ todoList: data });
      break;
    case 'POST':
      data.push(JSON.parse(req.body));
      res.status(201).json({});
      break;
    default:
      break;
  }
}
