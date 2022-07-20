import { createEvent, createStore } from "effector"
import { setPayload } from "shared/lib/effector-kit"
import { IUser } from "shared/types"

//store
export const $user = createStore<IUser>({ name: '' })
export const $userName = $user.map(({ name }) => name)
export const $logged = $userName.map(userName => !!userName)

//event
export const setUser = createEvent<IUser>()

$user.on(setUser, setPayload)