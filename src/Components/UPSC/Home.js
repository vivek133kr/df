import React from 'react'

import Blog from "./Blog/Blog";

function HomeFinal({ data, currentPage, publishData }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Blog data={data} pageTrack={currentPage} publishData={publishData} />
    </div>
  );
}

export default HomeFinal