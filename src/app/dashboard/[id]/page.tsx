'use client'
import Dashboard from '@/app/components/Dashboard';
import { useParams } from 'next/navigation'
import React from 'react'

export default function page() {
    const params = useParams()
    const userId = params.id as string;

    return (
        <div>
            <Dashboard id={userId} />
        </div>
    )
}
