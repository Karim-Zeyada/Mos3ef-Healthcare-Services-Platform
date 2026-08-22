import React from 'react'

export const LoginImageSection = () => {
  return (

    <section className="hidden md:flex flex-col items-center  justify-center gap-4 w-full ">
                        <img
                            className="w-full  h-auto"
                            alt="Doctors illustration"
                            src="https://c.animaapp.com/mif343zeUQBbG6/img/doctors-bro-1.svg"
                        />
                        <div className="flex flex-col items-center gap-4 w-full">
                            <h2 className="w-full text-center font-Cairo font-bold text-Blue-900 text-2xl tracking-[0] leading-[39px] [direction:rtl]">
                                صحتك هي أولويتنا. اعثر على أفضل رعاية بالقرب منك.
                            </h2>
                            <p className="w-full text-center opacity-90 font-Cairo font-normal  text-Blue-900 text-lg tracking-[0] leading-7">
                                Your health is our priority. Find the best care near you.
                            </p>
                        </div>
                    </section>
  )
}
