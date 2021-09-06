import { Helmet } from 'react-helmet'
import React from 'react'

const Meta = ( { title, description, keywords } ) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcom To Kivani Shop',
  description: 'We sell the best products for quality and cheap',
  keywords: ' handmade african original products, cheap, creative',
}

export default Meta
