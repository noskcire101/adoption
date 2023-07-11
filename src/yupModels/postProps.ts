import { ReactNode } from "react";

export interface postProps {
    author?: string;
    cover?: string;
    date?: string;
    description?: ReactNode;
    title?: string;
    subtitle?: string;
    id?: string;
  }