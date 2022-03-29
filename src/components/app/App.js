import HeroesList from '../heroesList/HeroesList';
import ContentInteractive from '../contentInteractive/ContentInteractive';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';

import './app.scss';

const App = () => {

    return (
        <main className="app">
            <div className="content">
                <HeroesList/>
                <div className='flex-column'>
                    <ContentInteractive placement={'start'} name={'Создать персонажа'}>
                        <HeroesAddForm/>
                    </ContentInteractive>
                    <ContentInteractive placement={'end'} name={'Фильтровать'}>
                        <HeroesFilters/>
                    </ContentInteractive>
                </div>
            </div>
        </main>
    )
}

export default App;