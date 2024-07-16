import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BlogDetail ({article}) {
  const formatDateHyphen = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }
  const formatDateSlash = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month}/${day}`;
  }

  if(!article){
    return <div>記事が見つかりませんでした。</div>
  }

  return (
    <div>
      <img src={article.thumbnailUrl} className='w-full h-[25rem] bg-slate-300' />
      <div className='p-4'>
        <div className='flex justify-between items-center'>
          <time class='text-xs text-[#ccc]' dateTime={formatDateHyphen(article.createdAt)}>{formatDateSlash(article.createdAt)}</time>
          <div>
            {article.categories.map((category,index)=><span className='text-xs text-[#0066cc] border border-solid border-[#0066cc] p-1 rounded mr-2' key={index}>{category}</span>)}
          </div>
        </div>
        <h2 class='text-2xl mt-2 mb-4'>{article.title}</h2>
        <p>
          {article.content}
        </p>
      </div>
    </div>
  );
}

export default function BlogDetailShow () {
  const {id} = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetcher = async () => {
        try{
          const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
          const data = await res.json();
          setArticle(data.post);
        } catch (error) {
          console.error('記事の取得中にエラーが発生しました:', error);
        } finally {
          setIsLoading(false);
        }
    };
    fetcher();
  },[id]);

  if (isLoading) {
    return <p>読み込み中です...</p>
  }

  return (
    <div className='mt-10 mx-auto w-[50rem] px-4'>
      <BlogDetail article={article}/>
    </div>
  );
}