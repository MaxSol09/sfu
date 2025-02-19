import { create } from "zustand";
import { Complaint, TypeStatus } from "../types/types";
import { isUser } from "../utils/checkValue";

interface ComplaintsStore {
    complaints: {
        items: Complaint[] | [],
        status: TypeStatus
    },
    getComplaints: (data: Complaint[]) => void,
    deleteComplaint: (data: {userID: string, autherID: string}) => void
}

export const useComplaintsStore = create<ComplaintsStore>((set) => ({
    complaints: {
        items: [],
        status: 'none'
    },
    getComplaints: (data) => set(() => {
        return {
            complaints : {
                items: data.filter(el => isUser(el.auther) && isUser(el.user)).sort((a, b) => {
                    let c = new Date(a.date).getTime();
                    let d = new Date(b.date).getTime();
                    return d-c
                }),
                status: 'success'
            }
        }
    }),
    deleteComplaint: (data) => set((state) => {
        return {
            complaints: {
                items: [...state.complaints.items.filter(el => isUser(el.auther) && isUser(el.user))].filter(el => !(el.auther._id === data.autherID && el.user._id === data.userID)),
                status: 'success'
            }
        }
    })
}))