export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: 'HRWEB Inc.',
    role: 'Junior Programmer',
    period: 'March 2024 – Present',
    bullets: [
      'Designed financial applications using Laravel, React, Tailwind, shadcn UI, and Inertia.js.',
      'Implemented secure authentication and real‑time data visualization modules.',
      'Improved platform stability by 30% and reduced user-reported bugs.',
    ],
  },
  {
    company: 'AWS (via Edukasyon.ph)',
    role: 'Cloud Engineering Intern',
    period: 'Sept 2023 – Jan 2024',
    bullets: [
      'Deployed scalable infrastructure with EC2, RDS, and S3 following AWS best practices.',
      'Automated operational tasks with Python scripts and Linux tooling.',
      'Implemented monitoring and logging with CloudWatch and IAM governance.',
    ],
  },
  {
    company: 'Dei Gratia School Inc.',
    role: 'IT Support Intern',
    period: 'Mar 2023 – Jul 2023',
    bullets: [
      'Maintained hardware and software assets and resolved technical issues.',
      'Supported students and staff with troubleshooting and connectivity.',
      'Improved workstation setup efficiency through documented procedures.',
    ],
  },
];
