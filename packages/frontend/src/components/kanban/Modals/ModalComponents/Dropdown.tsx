import React from 'react';
import useStore from '../../../../../store/kanbanState';
import { cn } from '../../../../Utils/func';
import ChevronIcon from '../../Icons/ChevronIcon';

type DropdownProps = {
    title: string;
    setState?: React.Dispatch<React.SetStateAction<string>>;
    newTask?: boolean;
};

const Dropdown = ({ title, setState, newTask = false }: DropdownProps) => {
    const { changeStatusByClick } = useStore();
    const selectItems = useStore((store) =>
        store.currentBoard?.columns?.map((col) => col.name),
    );
    const currentStatus = useStore((store) => store.currentTask.status);
    const [isOpen, setIsOpen] = React.useState(false);
    const [status, setStatus] = React.useState(
        !newTask ? currentStatus : selectItems[0],
    );

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };
    const handleStatusChange = (status: string) => {
        setStatus(status);
        changeStatusByClick(status);
    };
    React.useEffect(() => {
        if (setState) {
            setState(status);
        } else return;
    }, [status, setState]);
    return (
        <div className="flex flex-col gap-2">
            <h4 className="text-sm leading-tight text-mediumGrey dark:text-white capitalize">
                {title}
            </h4>
            <div
                onClick={handleOpen}
                className={cn(
                    'w-full px-4 py-2 border flex items-center justify-between hover:cursor-pointer relative border-mediumGrey/25 bg-inherit rounded-smd outline-none leading-5.5 text-black text-mds placeholder:text-black/25 dark:placeholder:text-white/25',
                    { 'border-primary': isOpen },
                )}
            >
                {status}{' '}
                <ChevronIcon className={cn({ 'rotate-180': !isOpen })} />
                <ul
                    className={cn(
                        'absolute top-full shadow-taskShadow transition-transform origin-top duration-150 mt-[5px] left-0 w-full flex flex-col gap-2 p-4 text-mediumGrey dark:text-white rounded-lg bg-white dark:bg-bgDark',
                        {
                            ' scale-y-0 ': !isOpen,
                        },
                    )}
                >
                    {selectItems &&
                        selectItems?.map((status, index) => {
                            return (
                                <li
                                    onClick={() => handleStatusChange(status)}
                                    key={index}
                                >
                                    {status}
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
};

export default Dropdown;