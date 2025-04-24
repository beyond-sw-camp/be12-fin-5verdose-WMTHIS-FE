import axios from "axios";

const instance = axios.create({
  baseURL: "/api", // 백엔드 API 주소로 변경
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 필요 시 (ex: 쿠키 인증)
});
export const api = {
  registerCategory(data) {
    console.log("registerCategory data", data);
    return instance
      .post("/category/register", data)
      .then((res) => {
        console.log("registerRes", res);
        console.log("code:", res.data.code);

        return res.data.code === 200; // 성공 시 true 반환;
      })
      .catch((error) => {
        console.error("Error in registerCategory:", error);
        return false;
      });
  },
  getCategoryList(page = 0, size = 10, keyword = "") {
    console.log("getCategoryList");

    let url = `/category/getList?page=${page}&size=${size}`;
    if (keyword && keyword.trim() !== "") {
      url += `&keyword=${encodeURIComponent(keyword)}`;
    }

    return instance
      .get(url)
      .then((res) => {
        console.log("registerRes", res);
        console.log("code:", res.data.code);
        if (res.data.code !== 200) {
          return false; // 실패 시 false 반환
        }
        return res.data.data; // 성공 시 데이터 반환
      })
      .catch((error) => {
        console.error("Error in getCategoryList:", error);
        return false;
      });
  },
  deleteCategory(data) {
    return instance.delete("/category/delete", {
      data: data,
    });
  },
  getCategory(data) {
    return instance.get("/category/detail", {
      params: data,
    });
  },

  getPOSCategory(categoryId) {
    return instance
      .get("/category/detail", {
        params: { id: categoryId }, // categoryId를 params로 전달
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error in getPOSCategory:", error);
        throw error;
      });
  },

  registerOption(data) {
    console.log("registerOption data", data);
    return instance
      .post("/option/register", data)
      .then((res) => {
        console.log("registerRes", res);
        return res.data.code === 200; // 성공 여부 반환
      })
      .catch((error) => {
        console.error("Error in registerOption:", error);
        return false;
      });
  },
  getOptionList(page = 0, size = 10, keyword = "") {
    let url = `/option/list?page=${page}&size=${size}`;
    if (keyword && keyword.trim() !== "") {
      url += `&keyword=${encodeURIComponent(keyword)}`;
    }
    return instance
      .get(url)
      .then((res) => {
        if (res.data.code !== 200) {
          return false;
        }
        return res.data.data;
      })
      .catch((error) => {
        console.error("Error in getOptionList:", error);
        return false;
      });
  },
  updateCategory(payload) {
    return axios.put("/api/category/update", payload);
  },
  deleteOptions(optionIdList) {
    return instance
      .post("/option/delete/batch", optionIdList)
      .then((res) => {
        console.log("deleteOptions res", res);
        return res.data.code === 200;
      })
      .catch((error) => {
        console.error("Error in deleteOptions:", error);
        return false;
      });
  },
  updateOption(requestData) {
    return instance
      .put("/option", requestData)
      .then((res) => {
        console.log("deleteOptions res", res);
        return res.data.code === 200;
      })
      .catch((error) => {
        console.error("Error in deleteOptions:", error);
        return false;
      });
  },
  getOptionById(optionId) {
    return instance
      .get(`/option/${optionId}`)
      .then((res) => {
        console.log("getOptionById res", res);
        if (res.data.code !== 200) {
          return false;
        }
        return res.data.data;
      })
      .catch((error) => {
        console.error("Error in getOptionById:", error);
        return false;
      });
  },
  getMenuList(page = 0, size = 5, keyword = "") {
    console.log("메뉴목록 요청", page, "size", size);

    let url = `/menu/getList?page=${page}&size=${size}`;
    if (keyword && keyword.trim() !== "") {
      url += `&keyword=${encodeURIComponent(keyword)}`;
    }
    return instance
      .get(url)
      .then((res) => {
        console.log("getMenuList res", res);
        return res.data;
      })
      .catch((error) => {
        console.error("Error in getMenuList: ", error);
        return false;
      });
  },
  getPOSMenuList() {
    return instance
      .get("/menu/getPOSList")
      .then((res) => {
        console.log("getMenuList res", res);
        return res.data;
      })
      .catch((error) => {
        console.error("Error in getMenuList: ", error);
        return false;
      });
  },

  getPOSCategoryList() {
    return instance
      .get("/category/getPOSCategoryList")
      .then((res) => {
        console.log("getPOSCategoryList res", res);
        return res.data;
      })
      .catch((error) => {
        console.error("Error in getPOSCategoryList: ", error);
        return false;
      });
  },

  registerInventory(storeInventoryData) {
    console.log("registerInventory storeInventoryData", storeInventoryData);
    return instance
      .post("/inventory/registerStoreInventory", storeInventoryData)
      .then((res) => {
        console.log("registerRes", res);
        console.log("code:", res.data.code);

        return res.data.code === 200 ? res.data.data : false; // 성공 시 데이터 반환
      })
      .catch((error) => {
        console.error("Error in registerInventory:", error);
        return false;
      });
  },
  updateInventory(storeInventoryData) {
    console.log("updateInventory storeInventoryData", storeInventoryData);

    try {
      const res = instance.put(
        `/inventory/storeInventory/${storeInventoryData.inventoryId}`,
        storeInventoryData
      );
      console.log("updateRes", res);
      console.log("code:", res.data.code);

      if (res.data.code === 200) {
        return res.data.data;
      } else {
        return 404;
      }
    } catch (error) {
      console.error("Error in updateInventory:", error);
      return 404;
    }
  },
  getInvenList() {
    return instance
      .get("/inventory/inventoryList")
      .then((res) => {
        console.log("getInvenList res", res);
        return res.data;
      })
      .catch((error) => {
        console.error("Error in getInvenList: ", error);
        return false;
      });
  },
  async SearchInventory(storeInventoryData) {
    try {
      const res = await instance.get(
        `/inventory/storeInventory/${storeInventoryData.inventoryId}`,
        storeInventoryData
      );
      console.log("searchRes", res);
      console.log("code:", res.data.code);

      if (res.data.code === 200) {
        return res.data.data; // 데이터를 반환
      } else {
        return 404; // 오류 처리
      }
    } catch (error) {
      console.error("Error in searchInventory:", error);
      return 404; // 오류 처리
    }
  },

  totalStoreInventory(storeInventoryData) {
    return instance
      .post("/inventory/totalInventory", storeInventoryData)
      .then((res) => {
        return res.data.code === 200 ? res.data.data : false;
      })
      .catch((error) => {
        console.error("Error in totalInventory:", error);
        return false;
      });
  },
  getMenuDetail(menuId) {
    console.log("getMenuDetail menuId", menuId);
    return instance
      .get(`/menu/${menuId}`)
      .then((res) => {
        console.log("getMenuDetail res", res);
        if (res.data.code !== 200) return false;
        return res.data.data;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
  },

  registerMenu(data) {
    return instance
      .post("menu/register", data)
      .then((res) => {
        if (res.data.code !== 200) {
          return false;
        }
        return res.data.data;
      })
      .catch((error) => {
        console.error("Error in registerMenu:", error);
        return false;
      });
  },
  updateMenu(data) {
    return instance
      .put("/menu/update", data)
      .then((res) => {
        if (res.data.code !== 200) {
          return false;
        }
        return res.data.data;
      })
      .catch((error) => {
        console.error("Error in updateMenu:", error);
        return false;
      });
  },
  getStoreInventoryList() {
    return instance
      .get("/inventory/storeInventory/getList")
      .then((res) => {
        if (res.data.code !== 200) return false;
        return res.data.data;
      })
      .catch((error) => {
        console.error("Error in getStoreInventoryList: ", error);
        return false;
      });
  },
  deleteMenus(menuIdList) {
    return instance
      .delete("/menu", {
        data: menuIdList,
      })
      .then((res) => {
        console.log("deleteMenus res", res);
        return res.data.code === 200;
      })
      .catch((error) => {
        console.error("Error in deleteMenus:", error);
        return false;
      });
  },
  getRecipes(inventoryId) {
    const payload =
      typeof inventoryId === "object"
        ? inventoryId
        : { inventoryId: inventoryId };

    return instance
      .post("/inventory/getRecipes", payload)
      .then((res) => {
        if (res.data.code !== 200) return { menuItems: [] };
        return res.data.data;
      })
      .catch((error) => {
        console.error("Error in getRecipes: ", error);
        return { menuItems: [] };
      });
  },
};
