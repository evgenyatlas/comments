import { FormEvent, useState } from 'react'
import styles from './MessageForm.module.css'
import { submit, sendFx } from '../../model'
import { useStore } from 'effector-react'
import { Spinner } from '../../../../shared/ui/Spinner'
import { $logged } from 'entities/viewer'
import { useActiveReply } from '../../lib/useActiveReply'
import { Input } from 'shared/ui/Input'

interface FormProps<T extends (e: string) => void> {
    submit: T
    className?: string
}

function Form<T extends (e: string) => void>({ submit, className }: FormProps<T>) {
    const logged = useStore($logged)
    const fetching = useStore(sendFx.pending)
    const [value, changeValue] = useState("")
    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        submit(value)
        changeValue("")
    }
    return (
        <form
            onSubmit={onSubmit}
            className={`${styles.MessageForm} ${className || ''} ${!logged ? styles.MessageForm_disable : ''}`}
        >
            <Input
                onInputValue={changeValue}
                placeholder="Введите ваше сообщение"
                required
            />
            <button className={styles.MessageForm__Send}>
                <img src="/img/send-icon.svg" alt="send" />
            </button>
            <Spinner display={fetching} minDuration={700}></Spinner>
            {
                !logged
                &&
                <div className={styles.MessageForm__Disable} />
            }
        </form>
    )
}

export function MessageForm() {
    return <Form submit={(value) => submit({ text: value })} />
}

export function ReplyMessageForm({ commentId }: { commentId: number }) {
    const active = useActiveReply(commentId)
    return (
        active
            ?
            <Form
                className={styles.MessageForm_reply}
                submit={
                    (value) => submit({ text: value, parentId: commentId }
                    )}
            />
            :
            null
    )
}
