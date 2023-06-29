import React from "react";

interface Props {
  toastMessageSuccess: (param: string) => void;
  toastMessageError: (param: string) => void;
}

const Dashboard = ({ toastMessageSuccess, toastMessageError }: Props) => {
  return <div>Dashboard</div>;
};

export default Dashboard;
