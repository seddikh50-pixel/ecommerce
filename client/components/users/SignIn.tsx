import Image from 'next/image'
import React from 'react'
import Container from '../common/Container';
import Link from 'next/link';
interface GoogleUser {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    createdAt : string
}
interface infos {
    handleLogout: () => void,
    user: GoogleUser
}


const SignIn = ({ handleLogout, user }: infos) => {

    return (
        <div className=''>
            <Container className='pt-20'>
                <div className='flex justify-between px-10 items-center border rounded-sm  py-2'>
                    <div className='flex justify-center items-center gap-6'>
                        <Image
                            width={100}
                            height={100}
                            src={user?.picture}
                            alt="User"
                            className="w-22 h-22 rounded-full mx-auto"
                        />
                        <div className='flex justify-center items-start flex-col'>
                            <h2 className="text-lg font-semibold ">hello {user?.name}</h2>
                            <p className="text-gray-600">{user?.email}</p>
                            <h1>member since {new Date(user.createdAt).toISOString().slice(0, 10)} </h1>
                        </div>
                    </div>
                    <div>

                        <button
                            onClick={handleLogout}
                            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-sm hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>





                <div className='grid grid-cols-4'>
                    <Link href={"/cart"}>Cart</Link>
                </div>

            </Container>


        </div>
    )
}

export default SignIn
