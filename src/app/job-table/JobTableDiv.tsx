import * as resources from  '../../resources';
import ResourceHeader from './ResourceHeader';
export default function JobTableDiv() {
  const enabled_resources = resources.all_resources
  
  const table = (
    <div className="jobTable">
      <p>Jobs</p>
      {
        enabled_resources.map(
          r => {
            return (<ResourceHeader key={r} resourceName={r}></ResourceHeader>);
          }
        )
      }
    </div>
  );
  return table;
}