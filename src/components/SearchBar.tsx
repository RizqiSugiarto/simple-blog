import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { useTags } from '../context/tagsContext';

interface SearchBarProps {
    setSearch: (change: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearch }) => {
    const { state, dispatch } = useTags();

    const tags = [
        { id: 1, name: 'All' },
        { id: 2, name: 'Sport' },
        { id: 3, name: 'Food' },
        { id: 4, name: 'Fashion' },
        { id: 5, name: 'Life' }
    ];

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <div className="flex justify-center flex-col">
            <div className="bg-white shadow-lg p-3 rounded-lg mt-16 mx-[25%] flex items-center">
                <CiSearch className="text-[20px] text-gray-400" />
                <input
                    type="text"
                    placeholder="Search"
                    className="outline-none ml-2 w-full"
                    onChange={handleChangeInput}
                />
            </div>
            <div className="flex gap-10 justify-center mt-4">
                {tags.map((item) => (
                    <ul
                        key={item.id}
                        onClick={() => {
                            dispatch({
                                type: 'SET_ACTIVE_TAG',
                                payload: item.name
                            });
                        }}
                        className={`${
                            state.activeTag === item.name
                                ? 'bg-purpleCustom text-white'
                                : ''
                        } p-1 pb-2 rounded-sm
                        md:rounded-full cursor-pointer md:px-4
                        hover:scale-110 hover:border-[1px] 
                        border-purpleCustom transition-all duration-100 ease-in-out`}
                    >
                        <li className="line-clamp-1">{item.name}</li>
                    </ul>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
