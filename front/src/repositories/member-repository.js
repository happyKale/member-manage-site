import { API } from "../libs/http-client";

export const memberRepository = {
  getAll() {
    return API.get("/members").then((res) => {
      return res;
    });
  },
  getOne(id) {
    return API.get(`/member/detail/${id}`).then((res) => {
      return res;
    });
  },
  add(data) {
    return API.post("/members", data).then((res) => {
      return res;
    });
  },
  delete(data) {
    return API.post(`/members/delete`, data).then((res) => {
      return res;
    });
  },
  update(id, data) {
    return API.patch(`/member/${id}`, data).then((res) => {
      return res;
    });
  },
};
