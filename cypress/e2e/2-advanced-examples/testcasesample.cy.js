const navbarText = Cypress.env('navbarText')
const token = 'ABCD123'

context('My First Test Case', () => {
  beforeEach(() => {
    cy.visit('/commands/actions')
  })

  // it('Popover on click', () => {
  //     cy.get('.action-btn').click()
  //     cy.findByText('This popover shows up on click').should('be.visible')
  // })

  // it('can clikc on different sections of a canvas', () => {
  //     cy.get('#action-canvas').click('top')
  //     cy.get('#action-canvas').click('bottomRight')
  //     cy.get('#action-canvas').click(80, 100)
  // })

  // it('it can double click', () => {
  //     cy.get('.action-div').dblclick().should('not.be.visible')
  //     cy.get('.action-input-hidden').should('be.visible')
  // })

  // it('right click to edit', () => {
  //     cy.get('.rightclick-action-div').rightclick().should('not.be.visible')
  //     cy.get('.rightclick-action-input-hidden').should('be.visible')
  // })

  it('hover actions', () => {
    cy.get('.dropdown-toggle').trigger('mouseover')
    cy.get('.dropdown-menu').should('be.visible')
  })
  // beforeEach(() => {
  //     cy.fixture('example').then(function(data) {
  //         this.data = data
  //         cy.log('This:', this.data)
  //     })
  // })

  it('sets and gets a token from local storage', () => {
    cy.setLocalStorage('Token', token)
    cy.getLocalStorage('Token').should('eq', token)
  })

  it('overwrites the type commans by sensitive char', () => {
    cy.visit('/commands/actions')
    cy.findByPlaceholderText('Email').type('TEST@EMAIL.COM')
    cy.findByPlaceholderText('Email').type('12345', { sensitive: true })
  })

  it('Pulls data from fixture', () => {
    cy.fixture('example').then((data) => {
      cy.log('DATA: ', data)
    })
  })

  it('updated fixtures data through here', () => {
    cy.fixture('example').then((data) => {
      data.email = 'update@email.com'
      cy.log('DATA:', data)
    })
  })

  it('uses fixture data in a network request', function () {
    cy.visit('/commands/network-requests')
    cy.intercept('GET', '**/comments/*', this.data).as('getComment')
    cy.get('.network-btn').click()
    cy.wait('@getComment').then((res) => {
      cy.log('Response: ', res)
    })
  })

  before(() => {
    cy.request('https://api.spacexdata.com/v3/missions').its('body').should('have.length', 10)
  })

  after(() => {
    cy.log('After is being used here')
  })

  afterEach(() => {
    cy.log('After each is being used here')
  })

  it('H1 is available in the page', () => {
    cy.get('h1').should('exist')
  })

  it('h1 contains the correct text Actions', () => {
    cy.get('h1').should('contain.text', 'Actions')
  })

  // it('Renders a paragraph under h1', () => {
  //     cy.get('.container').eq(1).find('p').should('exist')
  // })

  it('renders section with correct elements', () => {
    cy.get('.container').eq(2).within(() => {
      cy.get('h4').should('exist')
      cy.get('p').should('exist')
    })
  })

  it('Correctly renders the cypress website link', () => {
    cy.findByText(navbarText).should('exist')
  })

  // it('Correctly renders in finding text in the paragraph', () => {
  //     cy.get('.container').eq(2).within(() => {
  //         cy.findByText('Actions').should('exist')
  //     })
  // })

  // it('types into an email field', () => {
  //   cy.visit('/commands/actions')
  //   cy.findByPlaceholderText('Email').type('test@email.com')
  //   cy.wait(2000).then(() => {
  //     console.log('Complete after the wait 5000')
  //     fetch('https://api.spacexdata.com/v3/missions')
  //                   .then((res) => res.json())
  //                   .then((data) => {
  //                     console.log(data)
  //                   })
  //   })
  //   // console.log('test is finished')
  //   // cy.log('test is completed')
  // })

  it('shows an active class for the current page', () => {
    cy.visit('/commands/actions')
    cy.get('.dropdown-menu').find('li').eq(2).should('have.class', 'active')
  })

  it('should not have an active class on inactive pages', () => {
    cy.visit('/commands/actions')
    cy.get('.dropdown-menu').find('li').first()
            .should('not.have.class', 'active')
            .find('a')
            .should('have.attr', 'href', '/commands/querying')
  })

  it('links to the actions page correctly', () => {
    cy.visit('/')
    cy.findAllByText('Actions').first().click({ force: true })
    cy.url().should('include', 'commands/actions')
  })

  it('type in the input field', () => {
    cy.visit('/commands/actions')
    //  cy.findByPlaceholderText('Email').type('TEst').should('have.value', 'TEst')
  })

  // it('Clear an input fields', () => {
  //     cy.visit('/commands/actions')
  //     cy.findByLabelText('Describe:').type('Test Description').should('have.value', 'Test Description')
  //         .clear().should('have.value', '')
  // })

  // it('check on checkbox', () => {
  //   cy.visit('/commands/actions')
  //   cy.get('.action-checkboxes [type="checkbox"]').eq(1).check({ force: true }).should('be.checked')
  // })
})
