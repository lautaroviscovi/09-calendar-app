import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch"

describe('Pruenas en el helper fetch', () => {

    let token = '';
    
    test('fetchWithoutToken debe funcionar', async () => {
        
        const response = await fetchWithoutToken('auth',
            {   email: 'elon@spacex.com',
                password: '123456'
            },
            'POST');
        
            expect( response instanceof Response ).toBe( true );

            const body = await response.json();

            expect( body.Ok ).toBe( true );

            token = body.token;
    });
    
    test('fetchWithToken debe funcionar', async () => {
        
      localStorage.setItem( 'token' , token );

      const response = await fetchWithToken( 'events/600dd1020fe00c0015a6132a', {}, 'DELETE' );
      const body = await response.json();

      expect( body.msg ).toBe( 'Event dot not exist' );
    
    });

});
