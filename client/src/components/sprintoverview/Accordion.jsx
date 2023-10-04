import { Accordion } from 'flowbite-react';

const DefaultAccordion = () => {
    return (
        <Accordion collapseAll>
            <Accordion.Panel>
                <Accordion.Title>
                    <span className='flex gap-5 items-center'>
                        <img 
                            className='w-[60px] h-[60px] rounded-full object-cover'
                            src="http://localhost:5000/uploads/profileImage-1689353160505-571836841.webp"
                            />
                        <span>
                            <h2 className='text-lg font-bold text-gray-900'>Drilon Braha</h2>
                            <h2 className='text-sm font-light text-zinc-500'>db@kynetic.dk</h2>
                        </span>
                    </span>
                </Accordion.Title>
                <Accordion.Content>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dicta doloribus architecto adipisci, excepturi aliquid neque sequi est veniam sint inventore minus dignissimos omnis iste praesentium consequuntur natus animi. Illo molestias cumque dicta facilis, nihil unde distinctio perspiciatis earum pariatur obcaecati iure, eaque odit veniam? Consequatur itaque quae aperiam eligendi!
                    </p>
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    )
}

export default DefaultAccordion