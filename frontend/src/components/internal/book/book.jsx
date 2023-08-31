import { useUser } from '../../../context/userContext'
import { useLogbook } from '../../../context/logbookContext'
import Redirect from '../../shared/redirect'
import { Link } from 'react-router-dom'
import Nav from '../../shared/nav/nav'
import Building from '../../shared/building/building'
import './book.css'

function Book(){
    const user = useUser()
    const logbook = useLogbook()

    function scrollToTop(id) {
        const element = document.getElementById(id)
        const currentScroll = element.scrollTop;
        if (currentScroll === 0) return;    
        const duration = 500; // in milliseconds
        const start = performance.now();
        function animateScroll(timestamp) {
            const elapsed = timestamp - start;
            const progress = elapsed / duration;
            const ease = Math.sin(progress * Math.PI / 2);
            element.scrollTop = currentScroll * (1 - ease);
            if (elapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        }
        requestAnimationFrame(animateScroll);
    }
    if (user){
        if(logbook){
            return(
                <div className="book internal bg-stone-100 h-screen flex max-[850px]:block">
                    <Nav dashboard={true} />
                    <div className="book relative w-full max-[850px]:pt-20" id='window'>
                        <header className="w-full flex justify-end p-5 mt-2">
                            <div className='w-fit'>
                                <h2 className='text-4xl font-semibold'>Logbook 1</h2>
                                <div className='w-full flex justify-between mt-2'>
                                    <button className="text-sm text-gray-500 py-1 px-4 border border-gray-400 rounded-md">Preview</button>
                                    <button className="text-sm text-gray-500 py-1 px-4 border border-gray-400 rounded-md">Download</button>
                                </div>
                            </div>
                        </header>
                        <div className='px-10 max-[600px]:px-5'>
                            {[1, 2 ,3 ,4].map((week)=>{
                                return(
                                    <div className='mb-10 '>
                                        <div className='sticky hold'>
                                            <div className='text-violet-600 bg-stone-100 pt-12 max-[850px]:pt-3'>Week {week}</div>
                                            <div className='w-full flex justify-end border-t-2 border-violet-400'>
                                                <Link to='/create-new-log'>
                                                    <button className='text-3xl text-violet-600 px-3 py-1 border-2 border-violet-500 rounded-md bg-stone-100'>+</button>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className='flex justify-between flex-wrap mt-2'>
                                            {[0, 1, 2, 3, 4, 5, 6].map((i)=>{
                                                return(
                                                    <div className='log p-4 rounded-md bg-white mb-10 border'>
                                                        <div className='w-full text-right text-gray-400 mb-2'>12/12/2030</div>
                                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, libero voluptatibus! Facilis voluptatem, explicabo quod aliquid beataemolestias. Fuga vel magni porro molestiae cum pariatur autem! Ipsam magni neque quod?
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                            <button className='top p-5 bg-violet-500' onClick={()=>scrollToTop('window')}>
                                <img src='top.png'/>
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
        return (<Redirect pageName={"Dashboard"} url={"/dashboard"} message={"Logbook not found !!"} />)
    }
    return (<Redirect pageName={"Login"} url={"/login"} message={"Unauthotised aceess !!"} />)
}

export default Book