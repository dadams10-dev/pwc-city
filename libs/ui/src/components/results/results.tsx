import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DatasetList } from '../datasetList/datasetList';

type ResultItem = {
    id: string;
    url: string;
    body: string;
    image?: {
        url: string;
        altText?: string;
        length: number;
        mimeType?: string;
    };
    title: string;
    source: string;
    category?: string;
    language: string;
    publishedDate: string;
}

type ResultsData = {
    [key: string] : {
        totalResultsCount: number;
        results: [
            ResultItem
        ]
    };
}

// type ResultsData = {
//     pagination: {
//         itemsPerPage: number;
//         currentPage: number;
//     };
//     suggestion?: string;
//     allResults: {
//         totalResultsCount: number;
//         results: [
//             ResultItem
//         ]
//     };
//     [key: string] : {
//         totalResultsCount: number;
//         results: [
//             ResultItem
//         ]
//     };
//     newsResults: {
//         totalResultsCount: number;
//         results: [
//             ResultItem
//         ]
//     };
//     shopResults: {
//         totalResultsCount: number;
//         results: [
//             ResultItem
//         ]
//     };
//     videoResults: {
//         totalResultsCount: number;
//         results: [
//             ResultItem
//         ]
//     };
//     freeFormResults: {
//         totalResultsCount: number;
//         results: [
//             ResultItem
//         ]
//     };
//     helpCentreResults: {
//         totalResultsCount: number;
//         results: [
//             ResultItem
//         ]
//     };
//     doesContainProfanity: boolean;
//     actions: [
//         {
//             actionText: string;
//             url: string;
//             keyWords: string[];
//             image?: string;
//         }
//     ]
// }

export const Results =  () => {
    // const queryClient = useQueryClient();
    const [activeDataset, setActiveDataset] = useState('allResults');

    const resultsData = useQuery({
        queryKey: ['results'],
        queryFn: async (): Promise<ResultsData> => {
            const response = await fetch('https://api.npoint.io/78b7640e3587656bda74');
            return await response.json();
          },
    });
    const {status, data, error } = resultsData;

    if (status === 'error') {
        return (<p>Error - {error.message}</p>)
    }

    const datasets: string[] | null = data ? Object.keys(data).filter((key) => key.includes('Results')) : null;
    console.log(datasets);
    const itemCount = data ? data[activeDataset].totalResultsCount : null;

    return status === 'pending' ? (
        <p>Search results are loading ...</p>
    ) : (
        <>
            <DatasetList datasets={datasets} activeDataset={activeDataset} setActiveDataset={setActiveDataset} />
            <p>Showing results for <strong>phil foden</strong></p>
            <div>
                {itemCount === 0 ? (
                    <p>Sorry. There are no items to show of this type. Please choose another type.</p>
                ) : null}
                {data[activeDataset].results.map((item: ResultItem) => {
                    const formattedDate = new Date(item.publishedDate).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })
                    return (
                    <article key={item.id}>
                        <img src={`${item.image?.url || 'https://www.mancity.com/meta/media/zzmf0yr0/comingup_16x9_mar.jpg'}?width=164`} alt={item.image?.altText || item.title} />
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