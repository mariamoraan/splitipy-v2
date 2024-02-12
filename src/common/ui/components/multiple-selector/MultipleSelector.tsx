import { KeyboardEvent, useState, createContext, useContext, useEffect, useRef } from 'react'
import styles from './MultipleSelector.module.css'
import { ChevronDownIcon, LockIcon, XIcon } from '@primer/octicons-react'

export type Option = {
    value: string,
    label: string,
    isFixed: boolean
}

interface Props {
    options:  Option[],
    id: string,
    fixedItems?: Option[],
    createValue: (option: Option) => Promise<Option | null>,
    updateSelection: (options: Option[]) => void
}

const MultipleSelectorContext = createContext<{
    options: Option[],
    items: Option[],
    setItems: (options: Option[]) => void
    search: Option,
    setSearch: (search: Option) => void,
    createValue: (option: Option) => Promise<Option | null>,
    areOptionsVisible: boolean,
    setAreOptionsVisible: (areOptionsVisible: boolean) => void,
}>({
    options: [],
    items: [],
    setItems: (options: Option[]) => {},
    search: {
        value: '',
        label: '',
        isFixed: false,
    },
    setSearch: (search: Option) => {},
    createValue: async(option: Option) => await option,
    areOptionsVisible: false,
    setAreOptionsVisible: (areOptionsVisible: boolean) => {},
})

const ItemsMap = ({items, removeItem}: {items: Option[], removeItem: (item: Option) => void}) => {
    return (
        <ul 
        className={styles.items_list}
        >
            {items.map(item => 
                <li 
                className={`${styles.item} ${item.isFixed ? styles.fixed : ''}`} 
                key={`${item.value}_item`}
                onClick={() => removeItem(item)}
                >
                    {item.label}
                    {!item.isFixed ? <XIcon /> : <LockIcon />}
                </li>
            )}
        </ul>
    )
}

const SearchBar = () => {
    const {
        search, 
        setSearch, 
        createValue, 
        setAreOptionsVisible, 
        areOptionsVisible,
        setItems,
        items,
        options,
    } = useContext(MultipleSelectorContext)

    const onSubmitValue = async(e: KeyboardEvent) => {
        if(e.key !== 'Enter') return
        const option = await createValue(search)
        if(!option) return
        setItems([...items, option])
        setSearch({label: '', value: '', isFixed: false})
    }

    const isSelectedFromOptions = !!options.find(option => option.value === search.value)

    return (
        <div className={styles.search_bar_wrapper}>
            <input 
                type='search' 
                value={search.label}
                onChange={e => {setSearch({label: e.target.value, value: e.target.value, isFixed: false})}}
                className={`${styles.search_bar} ${isSelectedFromOptions ? styles.selected : ''}`}
                onKeyDownCapture={onSubmitValue}
            />
            <button 
            className={styles.menu_icon}
            onClick={() => setAreOptionsVisible(!areOptionsVisible)}
            >
                <ChevronDownIcon  />
            </button>
        </div>
    )
}

const OptionsDisplayer = () => {
    const {options, search, setSearch, areOptionsVisible, items} = useContext(MultipleSelectorContext)
    const onSelect = (option: Option) => {
        setSearch({label: option.label, value: option.value, isFixed: false})
    }
    const [coincidences, setCoincidences] = useState<Option[]>([])
    const getCoincidences = () => {
        const coincidences = options.filter(option => 
            option.label.toUpperCase().includes(search.label.toUpperCase()) ||
            search.label.toUpperCase().includes(option.label.toUpperCase())
        )  
        if(coincidences.length > 0) return coincidences
        else if(areOptionsVisible) return options
        else return []
    }
    
    const isOptionChoosen = (option: Option) => !!items.find(item => item.value === option.value) 
    const getAvailableOptions = () => options.filter(option => !isOptionChoosen(option))

    useEffect(() => {
        setCoincidences(getCoincidences())
    }, [search, areOptionsVisible])

    if(!areOptionsVisible && !search) return null
    if(!areOptionsVisible && (!search?.label || coincidences.length === 0)) return null
    if(getAvailableOptions().length === 0) return null

    const isOptionSelected = (option: Option) => option.value === search.value

    return (
        <ul 
        className={styles.options_list}
        >
            {coincidences.map(item => (
                <li 
                key={item.value} 
                onClick={() => onSelect(item)}
                className={`${styles.option} ${isOptionSelected(item) ? styles.selected_option : ''}`}
                >
                    {item.label}
                </li>
            ))}
        </ul>
    )
}

export const MultipleSelector = (props: Props) => {
    const {options, id, fixedItems=[], createValue, updateSelection} = props
    const [search, setSearch] = useState<Option>({label: '', value: '', isFixed: false})
    const [items, setItems] = useState<Option[]>(fixedItems.map(item => ({...item, isFixed: true})))
    const [areOptionsVisible, setAreOptionsVisible] = useState(false)

    useEffect(() => {
        setItems(fixedItems.map(item => ({...item, isFixed: true})))
    }, [fixedItems.length])

    useEffect(() => {
        updateSelection(items)
    }, [items.length])

    const removeItem = (item: Option) => {
        if(item.isFixed) return
        setItems(prev => prev.filter(({value}) => value !== item.value))
    }

   
    return (
        <MultipleSelectorContext.Provider value={{
            options, 
            items, 
            setItems,
            search, 
            setSearch, 
            createValue, 
            areOptionsVisible, 
            setAreOptionsVisible
            }}>
            <div 
            className={styles.wrapper}
            >
                <label htmlFor={id} className={styles.label}>
                    Añadir miembros:
                    <SearchBar />
                    <OptionsDisplayer />
                </label>
                <ItemsMap items={items} removeItem={removeItem} />
            </div>
        </MultipleSelectorContext.Provider>
    )
}