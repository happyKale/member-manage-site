function renderCellExpand(params) {
  return <span>{params.value}</span>;
}

export const dataGridColumnData = {
  home: [
    {
      field: "detail",
      headerName: "상세",
      width: 50,
      renderCell: renderCellExpand,
      align: "center",
    },
    {
      field: "modify",
      headerName: "수정",
      width: 70,
      renderCell: renderCellExpand,
    },
    { field: "team", headerName: "부서", width: 100 },
    { field: "rank", headerName: "직급", width: 100 },
    { field: "position", headerName: "직책", width: 100 },
    { field: "name", headerName: "사원명", width: 160 },
    { field: "officeNum", headerName: "사무실번호", width: 160 },
    { field: "phone", headerName: "핸드폰", width: 160 },
  ],
  remove: [
    { field: "name", headerName: "사원명", width: 110 },
    { field: "team", headerName: "부서", width: 100 },
    { field: "position", headerName: "직책", width: 100 },
    { field: "rank", headerName: "직급", width: 100 },
  ],
};
