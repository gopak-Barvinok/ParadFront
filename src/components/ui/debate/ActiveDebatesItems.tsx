import { ITopicsDataOrUndefined } from "@/interfaces/debates.interface";
import Link from "next/link";
import styles from "@/styles/components/ui/topic/topic-items.module.css";
import GreyButton from "@/components/buttons/Grey";

export default function ActiveDebatesItems({ topics }: ITopicsDataOrUndefined) {
  return (
    <div className={styles.topic_items}>
      <div className={styles.topic_items__container}>
        <div className={styles.topic_items__container__info}>
          <h1>Active Debates</h1>
        </div>
        <div className={styles.topic_items__container__debates}>
          {topics ? (
            topics.map((topic) =>
              topic?.debates.map((debate) => (
                <div
                  key={debate.id}
                  className={styles.topic_items__container__debates__debate}
                >
                  <div
                    className={
                      styles.topic_items__container__debates__debate__img
                    }
                  ></div>
                  <div
                    className={
                      styles.topic_items__container__debates__debate__text
                    }
                  >
                    <div>
                      <h4 className="purple_color">Topic #{topic.id} </h4>
                      <h4>Debate #{debate.id}</h4>
                    </div>
                    <p>{debate.point}</p>
                    <Link
                      href={`/debates/topic-${topic.id}/debate-${debate.id}`}
                    >
                      <GreyButton style={{ width: "100%" }} title="Inspect" />
                    </Link>
                  </div>
                </div>
              ))
            )
          ) : (
            <div className={styles.topic_items__container__debates__not_found}>
              <h3>No Active Debates Found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
