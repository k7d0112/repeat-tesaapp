import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Blog({posts}) {
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

  return (
    <>
      {posts.map((post)=>{
        return(
          <li className='mb-8' key={post.id}>
            <Link to={`/BlogDetail/${post.id}`}>
              <div className='p-4 border border-solid border-[#ccc]'>
                <div className='flex justify-between items-center'>
                  <time className='text-[#ccc] text-xs' dateTime={formatDateHyphen(post.createdAt)}>{formatDateSlash(post.createdAt)}</time>
                  <div>
                    {post.categories.map((category,index)=><span className='text-xs text-[#0066cc] border border-solid border-[#0066cc] p-1 rounded mr-2' key={index}>{category}</span>)}
                  </div>
                </div>
                <h2 className='mt-2 mb-4 text-2xl'>{post.title}</h2>
                <p className='line-clamp-2 w-2/3'>
                    {post.content}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </>
  );
}

export default function BlogList() {
  const [posts,setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      try{
        const res = await fetch('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts');
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('記事の読み込み中にエラーが発生しました:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetcher();
  },[]);

  if (isLoading) {
    return <p>読み込み中です...</p>
  }

    return (
      <div className='container mx-auto w-[48rem] px-4 mt-10'>
        <ul>
          <Blog posts={posts}/>
        </ul>
      </div>
    );
}