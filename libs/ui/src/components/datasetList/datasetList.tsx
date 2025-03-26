import { Chip, ChipSize, ChipType } from '../../elements/chip/chip'

type DatasetProps = {
    datasets: string[] | null;
    activeDataset: string;
    setActiveDataset: React.Dispatch<React.SetStateAction<string>>;
}

export const DatasetList = ({datasets, activeDataset, setActiveDataset}: DatasetProps) => {

    return (
        <div>
            {datasets?.map((dataset) => 
                <Chip
                    key={dataset} 
                    label={dataset}
                    size={ChipSize.XLarge}
                    type={ChipType.Filled}
                    isActive={dataset === activeDataset}
                    pill
                    onKeyDown={() => setActiveDataset(dataset)}
                    callback={() => setActiveDataset(dataset)}
                />
            )}
        </div>
    );
}

export default DatasetList;