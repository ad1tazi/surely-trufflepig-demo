import { JobData } from "@/lib/types"

export async function POST(request: Request) {
  // Check to make sure that .env file contains the trufflepig API key
  if (!process.env.TP_API_KEY) {
    throw new Error("Missing Trufflepig API key: TP_API_KEY")
  }

  const { query } = await request.json()
 
  try {
    // Make a request to the trufflepig API using the REST API
    const response = await fetch(`https://api.trufflepig.ai/v0/indexes/surelywork03/search?query_text=${query}`, {
      method: 'POST',
      headers: {
        'x-api-key': process.env.TP_API_KEY
      }
    })

    // Check if the request was successful
    if (!response.ok) {
      console.error(`Error fetching data: [${response.status}] ${response.statusText}`)
      return new Response(`Error fetching data: [${response.status}] ${response.statusText}`, { status: response.status })
    }

    const results = await response.json()

    // Create a map to store the job data
    const jobDataMap = new Map<string, JobData>()

    console.table({ query })
    console.table(results, ["document_key", "score"])

    // Loop through the results and add them to the jobDataMap
    for (const result of results) {
      if (result.document_key && !jobDataMap.has(result.document_key) && result.metadata && result.score > 0.10) {
        const metadata = result.metadata

        let title, description, profession, industry, location, startDate, endDate, createdAt, budgetType, budgetRate, budgetRangeMin, budgetRangeMax;
        try {
            title = decodeURIComponent(metadata.title);
            description = decodeURIComponent(metadata.description);
            profession = decodeURIComponent(metadata.profession);
            industry = decodeURIComponent(metadata.industry);
            location = decodeURIComponent(metadata.location);
            startDate = decodeURIComponent(metadata.startDate);
            endDate = decodeURIComponent(metadata.endDate);
            createdAt = decodeURIComponent(metadata.createdAt);
            budgetType = decodeURIComponent(metadata.budgetType);
            budgetRate = decodeURIComponent(metadata.thumbnailId);
            budgetRangeMin = decodeURIComponent(metadata.budgetRate);
            budgetRangeMax = decodeURIComponent(metadata.budgetMax);
        } catch {
            title = metadata.title;
            description = metadata.description;
            profession = metadata.profession;
            industry = metadata.industry;
            location = metadata.location;
            startDate = metadata.startDate;
            endDate = metadata.endDate;
            createdAt = metadata.createdAt;
            budgetType = metadata.budgetType;
            budgetRate = metadata.thumbnailId;
            budgetRangeMin = metadata.budgetRate;
            budgetRangeMax = metadata.budgetMax;
        }

        const jobData: JobData = {
            title: title,
            description: description,
            profession: profession,
            industry: industry,
            location: location,
            startDate: startDate,
            endDate: endDate,
            createdAt: createdAt,
            budgetType: budgetType,
            budgetRate: budgetRate,
            budgetRangeMin: budgetRangeMin,
            budgetRangeMax: budgetRangeMax,
            score: result.score
        };

        console.log('DEBUG');
        console.log(jobData);
        
        jobDataMap.set(result.document_key, jobData);
      }
    }

    const jobData = Array.from(jobDataMap.values())
    console.log('DEBUG');
    console.log(JSON.stringify(jobData));
    return new Response(JSON.stringify(jobData), { status: 200 })
  } catch (error) {
    console.error("Failed to fetch repository data:", error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
