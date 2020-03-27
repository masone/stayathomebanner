context('Embeds', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it("resizes iframes", () => {
    cy.get("#iFrameResizer0[style*=height]").then(($iframe) => {
      expect($iframe.outerHeight()).to.be.lessThan(150)
    })
    cy.get("#iFrameResizer1[style*=height]").then(($iframe) => {
      expect($iframe.outerHeight()).to.be.lessThan(150)
    })
    cy.get("#iFrameResizer2[style*=height]").then(($iframe) => {
      console.log($iframe)
      expect($iframe.outerHeight()).to.be.lessThan(150)
    })
    // cy.get("#iFrameResizer3[style*=height]").then(($iframe) => {
    //   console.log($iframe)
    //   expect($iframe.outerHeight()).to.be.lessThan(150)
    // })
  })
})
