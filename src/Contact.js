import { React, useState } from 'react';

export default function Form () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contents, setContents] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setError] = useState({});

  const validate = () => {
    const errors = {};
    if (!name) {
      errors.name = '名前は必須です';
    } else if (name.length > 30) {
      errors.name = '名前は30文字以内で入力してください';
    }
    if (!email) {
      errors.email = 'メールアドレスは必須です';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = '有効なメールアドレスを入力してください';
    }
    if (!contents) {
      errors.contents = '本文は必須です';
    } else if (contents.length > 500) {
      errors.contents = '本文は500字以内で入力してください';
    }
    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        await sendForm({ name, email, contents });
        alert('送信完了しました');
        setName('');
        setEmail('');
        setContents('');
      } catch (error) {
        alert ('送信に失敗しました。再度お試しください。');
      } finally {
        setIsSubmitting(false);
      }
    } else {
        setError(errors);
    }
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setContents('');
    setError({});
  };

  const sendForm = async (formData) => {
    try {
      const response = await fetch ('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts',{
      method: 'POST',
      header: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error ('Network response was not ok');
      }

      const result = await response.json();
      return result;
    } catch (error) {
        console.error('There was a problem with the fetch operation:',error);
        throw error;
    }
  };

  return (
    <div className='max-w-[800px] mx-auto mt-10'>
      <h2 className='text-xl font-bold'>問合わせフォーム</h2>
      <form className='mt-10' onSubmit={handleSubmit}>
        <dl>
          <div className='flex justify-between items-center'>
            <dt className='w-[240px]'><label htmlFor='name'>お名前</label></dt>
            <dd className='w-full'><input type='text' id='name' name='name' className='border border-gray-300 rounded-lg p-4 w-full' required value={name} onChange={(e)=>setName(e.target.value)} disabled={isSubmitting} /></dd>
          </div>
          {errors.name && <p>{errors.name}</p>}
          <div className='flex justify-between items-center mt-6'>
            <dt className='w-[240px]'><label htmlFor='email'>メールアドレス</label></dt>
            <dd className='w-full'><input type='text' id='email' name='email' className='border border-gray-300 rounded-lg p-4 w-full' required value={email} onChange={(e)=>setEmail(e.target.value)} disabled={isSubmitting} /></dd>
          </div>
          {errors.email && <p>{errors.email}</p>}
          <div className='flex justify-between items-center mt-6'>
            <dt className='w-[240px]'><label htmlFor='contents'>本文</label></dt>
            <dd className='w-full'><textarea name='contents' id='contents' rows='8' className='border border-gray-300 rounded-lg p-4 w-full' required value={contents} onChange={(e) => setContents(e.target.value)} disabled={isSubmitting} ></textarea></dd>
          </div>
          {errors.contents && <p>{errors.contents}</p>}
        </dl>
        <div className='mt-10 flex justify-center items-center'>
          <button type='submit' className='bg-gray-800 text-white font-bold py-2 px-4 rounded-lg' disabled={isSubmitting} >送信</button>
          <button className='ml-4 bg-gray-200 font-bold py-2 px-4 rounded-lg' onClick={handleClear} disabled={isSubmitting} >クリア</button>
        </div>
      </form>
    </div>
  );
}