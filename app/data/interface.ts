import { JSX } from "react";

export type Experience = {
  id: number;
  company: string;
  location: string;
  position: string;
  duration: string;
  description: string[];
  remote?: boolean;
  technologies: string[];
};

export type Skill = {
  name: string;
  icon: JSX.Element;
  category: "frontend" | "state" | "styling" | "backend" | "tools";
};

export type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
};

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export type SubmitStatus = "success" | "error" | null;
