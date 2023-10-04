import { Accordion } from 'flowbite-react';

const DefaultAccordion = () => {
    return (
        <Accordion collapseAll>
            <Accordion.Panel>
                <Accordion.Title>
                    What is Flowbite?
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