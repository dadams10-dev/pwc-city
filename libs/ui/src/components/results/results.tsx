import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DatasetList } from '../datasetList/datasetList';
import styles from './results.module.scss';
import Item from './components/item/item';

export type ResultItem = {
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

export const Results =  () => {
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
    const itemCount = data ? data[activeDataset].totalResultsCount : null;

    // To do - better loading/pending state. 
    // I'd assume there would be a design or a generic loading spinner component for this.
    return status === 'pending' ? (
        <div className={styles.resultsContainer}>
            <p className={styles.loadingCopy}>Search results are loading ...</p>
        </div>
    ) : (
        // I experimented with nesting the grid by adding row and col-9/col-8 div's here to limit the width
        // of the results container on desktop size screens. Neither gave me the width I was after,
        // and I also started to get into conditionally adding classes based on screen width. I personally 
        // prefer to handle it in CSS to avoid having to check screen widths in JS and then
        // listen for any changes of screen width.
        <div className={styles.resultsContainer}>
            <DatasetList datasets={datasets} activeDataset={activeDataset} setActiveDataset={setActiveDataset} />
            <p className={`${styles.showingFor} body-xsmall`}>Showing results for <strong>phil foden</strong></p>
            <div className={styles.resultItems}>
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
                        <Item item={item} formattedDate={formattedDate} key={item.id} />
                )})}
            </div>
        </div>
    )
}

export default Results;