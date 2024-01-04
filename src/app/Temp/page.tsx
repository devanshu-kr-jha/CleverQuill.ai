"use client"
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    const testSupa = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/testSB')
            return response.data
        }
    })

  return (
    <div>
        <Button onClick={() => {
            testSupa.mutate(undefined, {
                onSuccess: () =>{
                    console.log('Success')
                },
                onError: (err) =>{
                    console.error(err)
                }
            })
        }} variant={'outline'}>Click Me</Button>
    </div>
  )
}

export default page