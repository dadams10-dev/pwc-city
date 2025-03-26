import {useQueryClient, useQuery} from '@tanstack/react-query';

type ResultItem = {
    id: string;
    url: string;
    body: string;
    image?: string;
    title: string;
    source: string;
    category?: string;
    language: string;
    publishedDate: string;
}

type ResultsData = {
    pagination: {
        itemsPerPage: number;
        currentPage: number;
    };
    suggestion?: string;
    allResults: {
        totalResultsCount: number;
        results: [
            ResultItem
        ]
    };
    doesContainProfanity: boolean;
    actions: [
        {
            actionText: string;
            url: string;
            keyWords: string[];
            image?: string;
        }
    ]
}

export const Results = () => {
    // const queryClient = useQueryClient();

    const resultsData = useQuery({
        queryKey: ['results'],
        queryFn: async (): Promise<ResultsData> => {
            const response = await fetch('https://api.npoint.io/78b7640e3587656bda74');
            return await response.json();
          },
    });
    const {status, data, error } = resultsData;

    console.log(resultsData);

    if (status === 'error') {
        return (<p>Error - {error.message}</p>)
    }

    return status === 'pending' ? (
        <p>Pending ...</p>
    ) : (
        <>
            <div>Category Chips to go here</div>
            <p>Showing results for <strong>phil foden</strong></p>
            <div>
                {data.allResults.results.map((item) => {
                    const formattedDate = new Date(item.publishedDate).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })
                    return (
                    <article key={item.id}>
                        <img src={`${item.image || 'https://www.mancity.com/meta/media/zzmf0yr0/comingup_16x9_mar.jpg'}?width=164`} alt={item.title} />
                        <h3>Subtitle</h3>
                        <span>{formattedDate}</span>
                        <h2>{item.title}</h2>
                        <p>{item.body}...</p>
                    </article>
                )})}
            </div>
        </>
    )
}

export default Results;