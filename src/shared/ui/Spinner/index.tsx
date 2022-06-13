import { FC } from 'react'
import styles from './Spinner.module.css'
import { Transition } from 'react-transition-group'
import { useSpinDelay } from '../../lib/usePinDelay'


interface Props {
    className?: string
    display?: boolean
    color?: string
    minDuration?: number
    full?: boolean
}

export const Spinner: FC<Props> = ({ className, color, display = true, minDuration = 0, full, }: Props) => {
    display = useSpinDelay(display, { minDuration, delay: 0 })
    const style = { borderColor: color ?? `${color} transparent ${color} transparent` }
    return (
        <Transition
            timeout={300}
            in={display}
            unmountOnExit
        >
            {state => <div className={`${styles[`Spinner__Container_${state}`]} ${styles.Spinner__Container}`}>
                <div className={`${styles.Spinner} ${styles[`Spinner_${state}`]} ${className || ''} ${full ? styles.Spinner_full : ''}`} style={style}></div>
            </div>}
        </Transition>
    )
}


