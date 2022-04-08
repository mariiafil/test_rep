import React, {useRef, useState} from 'react';
import './App.css';

function App() {
    const [islandsNumber, setIslandsNumber] = useState(0)
    const formRef = useRef<HTMLFormElement>(null)
    function countIslands(grid: number[][]) {
        const lengthI = grid[0].length
        const lengthJ = grid.length
        const islands = [] // coordinates of 1
        // get array of indexes of all 1
        for (let i = 0; i < lengthI; i += 1) {
            for (let j = 0; j < lengthJ; j += 1) {
                if (grid[i][j] === 1) {
                    islands.push([i, j])
                }
            }
        }
        const groups: Record<string, number> = {} // [ij]: n

        for (let i = 0; i < islands.length; i += 1) {
            for (let j = 0; j < islands.length; j += 1) {
                if ((Math.abs((islands[i][0] - islands[j][0])) === 1 && (islands[i][1] - islands[j][1]) === 0) ||
                    (Math.abs((islands[i][0] - islands[j][0])) === 0 && (islands[i][1] - islands[j][1]) === 1) ||
                    ((Math.abs((islands[i][0] - islands[j][0])) === 0 && (islands[i][1] - islands[j][1]) === 1))
                ) {
                    let n =  null // index of group
                    if (Object.keys(groups).includes(`${islands[i][0]}${islands[i][1]}`)) {
                        n = groups[`${islands[i][0]}${islands[i][1]}`]
                    } else if (Object.keys(groups).includes(`${islands[j][0]}${islands[j][1]}`)) {
                        n = groups[`${islands[j][0]}${islands[j][1]}`]
                    } else {
                        n = Object.values(groups).length ? Math.max(...Object.values(groups)) + 1 : 1
                    }
                    if (!groups[`${islands[i][0]}${islands[i][1]}`]) {
                        groups[`${islands[i][0]}${islands[i][1]}`] = n
                    }
                    if (!groups[`${islands[j][0]}${islands[j][1]}`]) {
                        groups[`${islands[j][0]}${islands[j][1]}`] = n
                    }
                }
            }
        }

        const uniqueGroups = new Set(Object.values(groups))
        const single = islands.length - Object.keys(groups).length
        return uniqueGroups.size + single
    }

    const createMatrix = () => {
        const inputs = formRef?.current?.querySelectorAll('input') ?? []

        inputs.forEach(it => {
            let random = Math.random();
            if (random < 0.5)
                random = 0
            else
                random= 1
            it.value = String(random)
        })
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        const lines = e.target.querySelectorAll('div')
        const inputs = [...lines].map(it => [...it.querySelectorAll('input')])
        const grid = inputs.map(it => it.map(i => +i.value))
        const islands = countIslands(grid);
        setIslandsNumber(islands)
    }

  return (
    <div className="app">
        <form ref={formRef} onSubmit={(e) => onSubmit(e)}>
            <button onClick={createMatrix}>Create random grid</button>
            <div>
                <input defaultValue={0} type="number" min={0} max={1} />
                <input defaultValue={0} type="number" min={0} max={1} />
                <input defaultValue={0} type="number" min={0} max={1} />
                <input defaultValue={0} type="number" min={0} max={1} />
                <input defaultValue={0} type="number" min={0} max={1} />
            </div>
            <div>
                <input defaultValue={0} type="number" min={0} max={1} />
                <input defaultValue={0} type="number" min={0} max={1} />
                <input defaultValue={0} type="number" min={0} max={1} />
                <input defaultValue={0} type="number" min={0} max={1} />
                <input defaultValue={0} type="number" min={0} max={1} />
            </div>
            <div>
                <input defaultValue={0} type="number" min={0} max={1} />
                <input defaultValue={0} type="number" min={0} max={1} />
                <input defaultValue={0} type="number" min={0} max={1} />
                <input defaultValue={0} type="number" min={0} max={1} />
                <input defaultValue={0} type="number" min={0} max={1} />
            </div>
            <div>
                <input defaultValue={0} type="number" min={0} max={1} />
                <input defaultValue={0} type="number" min={0} max={1} />
                <input defaultValue={0} type="number" min={0} max={1} />
                <input defaultValue={0} type="number" min={0} max={1} />
                <input defaultValue={0} type="number" min={0} max={1} />
            </div>
            <div>
                <input defaultValue={0} type="number" min={0} max={1} />
                <input defaultValue={0} type="number" min={0} max={1} />
                <input defaultValue={0} type="number" min={0} max={1} />
                <input defaultValue={0} type="number" min={0} max={1} />
                <input defaultValue={0} type="number" min={0} max={1} />
            </div>
        </form>
        {islandsNumber ? <p>You created {islandsNumber} islands</p> : null}
    </div>
  );
}

export default App;
