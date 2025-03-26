import { Chip, ChipSize, ChipType } from '../../elements/chip/chip'
import styles from './datasetList.module.scss';

type DatasetProps = {
    datasets: string[] | null;
    activeDataset: string;
    setActiveDataset: React.Dispatch<React.SetStateAction<string>>;
}

type DatasetLabel = {
    [key: string] : string;
}

export const DatasetList = ({datasets, activeDataset, setActiveDataset}: DatasetProps) => {

    const datasetLabel: DatasetLabel = {
        allResults: 'All',
        newsResults: 'News',
        shopResults: 'Shop',
        videoResults: 'Video',
        freeFormResults: 'Free Form',
        helpCentreResults: 'Help Centre'
    }

    return (
        <div className={styles.container}>
            {datasets?.map((dataset) => 
                <Chip
                    key={dataset} 
                    label={datasetLabel[dataset]}
                    size={ChipSize.XLarge}
                    type={ChipType.Filled}
                    isActive={dataset === activeDataset}
                    pill
                    onKeyDown={() => setActiveDataset(dataset)}
                    callback={() => setActiveDataset(dataset)}
                    className={styles.datasetChip}
                />
            )}
        </div>
    );
}

export default DatasetList;