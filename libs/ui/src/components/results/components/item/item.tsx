import { ResultItem } from "../../results";
import styles from "./item.module.scss"

type ItemProps = {
    item: ResultItem;
    formattedDate: string;
}

export default function Item({item, formattedDate}: ItemProps) {

    // Assumption: image and title will be links to the individual page for the article/video/shop item

    return (
        <article className={styles.item}>
            <a href={item.url} className={styles.imgLink}>
                <img src={`${item.image?.url || 'https://www.mancity.com/meta/media/zzmf0yr0/comingup_16x9_mar.jpg'}?width=164`} alt={item.image?.altText || item.title} />
            </a>
            <div>
                <div className={`${styles.labelDate} label-small`}>
                    <span className={styles.label}>Subtitle</span> | <span className={styles.date}>{formattedDate}</span>
                </div>
                <h2 className="body-small bold"><a href={item.url} className={styles.titleLink}>{item.title}</a></h2>
            </div>
            <p className="body-xsmall">{item.body}...</p>
        </article>
    )
}