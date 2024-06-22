import { JobData } from "@/lib/types"
import { RepoCard } from "@/components/RepoCard"
import React, { use } from "react"

export interface RepoListProps {
  results?: JobData[]
  preview?: boolean
}

export const RepoList = ({ results, preview = false }: RepoListProps) => {
  if (!results) {
    return null
  }

  return (
    <>
      {
        results.length > 0 && (
          results.map((job) => (
            <RepoCard key={job.title} jobData={job} />
          ))
        )
      }
    </>
  )
}

