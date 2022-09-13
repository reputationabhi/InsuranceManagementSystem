import create from 'zustand'
import {devtools, persist} from 'zustand/middleware'

const Store = (set) => ({
    username: "",
    jwtToken: ""
    ,
    addValues: (username, jwtToken) => {
        set((state) => ({
            username: username,
            jwtToken: jwtToken,
        }))
    },
    removeValues: () => {
        set((state) => ({
            username: "",
            jwtToken: ""
        }))
    },
})

const useStore = create(
    devtools(
        persist(Store, {
            name: "localStore"
        })
    )
)

export default useStore;