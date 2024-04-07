import JobTableDiv from './JobTableDiv';
import {getJobs}  from '../../jobs'
export default function JobTablePage() {
  return (
    <main>
      <h1>Hello Toast!</h1>
      <p>I greatly admire your ship!</p>
      {getJobs()}
      <JobTableDiv></JobTableDiv>
    </main>
  );
}