import express from 'express';
import { Request, Response } from 'express';

const app = express();
app.use(express.json());

interface JobApplication {
  name: string;
  email: string;
  resumeUrl: string;
  coverLetter: string;
}

const jobApplications: JobApplication[] = [];

app.post('/apply', (req: Request, res: Response) => {
  const { name, email, resumeUrl, coverLetter } = req.body;

  if (!name || !email || !resumeUrl || !coverLetter) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const application: JobApplication = {
    name,
    email,
    resumeUrl,
    coverLetter,
  };

  jobApplications.push(application);

  res.status(201).json({ message: 'Application submitted successfully', application });
});

app.get('/applications', (req: Request, res: Response) => {
  res.json(jobApplications);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});