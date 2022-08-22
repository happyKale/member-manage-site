import { API } from "../libs/http-client";

export const memberRepository = {
  getAll() {
    return API.get("/members").then((res) => {
      return res;
    });
  },
  getOne(id) {
    return API.get(`/members/detail/${id}`).then((res) => {
      return res;
    });
  },
  add(data) {
    return API.post("/members", data).then((res) => {
      return res;
    });
  },
  delete(id) {
    return API.delete(`/members?memberId=${id}`).then((res) => {
      return res;
    });
  },
};
