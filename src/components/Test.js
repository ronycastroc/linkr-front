import { useState } from "react";

export default async function Test(){

    async function fetchIssues(url) {
        const response = await fetch(url, {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/vnd.github.v3+json'
          })
        });
        const issues = await response.json();
      
        return {
          issues
        };
      }
      const [nextPageUrl, setNextPageUrl] = useState(
        'https://api.github.com/repos/facebook/react/issues'
      );
     const { issues } =  await fetchIssues(nextPageUrl)
     console.log(issues)



     return (<p>salve</p>)
}