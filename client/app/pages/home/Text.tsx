import Container from '@/components/common/Container'
import { cn } from '@/lib/utils'
import React from 'react'
interface Props {
    children : React.ReactNode,
    className? : string
}
const Text = ({children,className} : Props) => {
  return (
    <Container>
        <div className={cn(`${className}`)}>{children} </div>
    </Container>
  )
}

export default Text