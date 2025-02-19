import {TypeLikes } from "../types/types";


export function checkTwoArrayId(arr1: TypeLikes[], id: string) {
    const ids = new Set();

    for (const obj of arr1) {
      if ('_id' in obj) { //Added check for _id
        ids.add(obj._id);
      }
    }
    if (ids.has(id)) {
        return true;
    }

    return false;
  }