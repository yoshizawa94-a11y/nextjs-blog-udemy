import utilStyles from "../styles/utils.module.css"
import styles from "../styles/Home.module.css"
import Layout, { siteTile } from "@/components/Layout";
import Link from "next/link";
import { getPostsData } from "@/lib/post";
import Head from "next/head";

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData();
  return {
    props: {
      allPostsData,
    }
  }
}

// SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
      
//     }
//   }
// }

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTile}</title>
      </Head>
      <section  className={utilStyles.headingMd}>
        <p>プロフィールです プロフィールです プロフィールです プロフィールです プロフィールです プロフィールです プロフィールです プロフィールです プロフィールです </p>
      </section>

      <section>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({id ,title, date ,thumbnail}) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage}></img>
              </Link>
              <Link href={`/posts/${id}`} legacyBehavior>
                <a className={utilStyles.boldText}>{title}</a>
              </Link>
              <br/>
              <small className={utilStyles.lightText}>
                {date}
              </small>
            </article>
          ))}
        </div>
      </section>
      
    </Layout>
  );
}
