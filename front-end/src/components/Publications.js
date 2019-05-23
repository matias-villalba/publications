import React, { Component } from "react";
import { connect } from "react-redux";
import { loadNextPublications , loadPreviousPublications, changePublicationsOrder} from "../actions/index";
import LoadPageButton from './LoadPageButton'
import Post from "./Posts"
import { withStyles } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input'
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Search from "./Search"
import AuthorCard from "./AuthorCard"
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Publications extends Component {
  constructor() {
    super();

    this.changePublicationsOrder = this.changePublicationsOrder.bind(this) 
    this.loadNextPublications = this.loadNextPublications.bind(this)
    this.loadPreviousPublications = this.loadPreviousPublications.bind(this)
  }

  loadNextPublications(){
    this.props.loadNextPublications(this.props.nextPageQuery);
  }

  loadPreviousPublications(){
    this.props.loadPreviousPublications(this.props.previousPageQuery)
  }

  changePublicationsOrder(event){ 
    const newestFirst = event.target.value
    this.props.changePublicationsOrder((newestFirst == "true"))
  }
  
  render() {
    const { classes } = this.props;
    return (
      
        <div>
        <FormControl className={classes.formControl}>
        
          {(!this.props.currentAuthor || !this.props.currentAuthor.id)?
            (<Search />):''
          }
          <AuthorCard/>

          {(this.props.showingASearchResult)?
              ''
              :          
            <div>
              <NativeSelect defaultValue={this.props.showNewestPublicationsFirst} input={<Input name="name" id="publications-order" 
              onChange={this.changePublicationsOrder} />}>            
              <option value={true}>Newest first</option>
              <option value={false}>Oldest first</option>
            </NativeSelect>
            <FormHelperText>Order</FormHelperText>
            </div>}

        </FormControl>
        

        <Post />

        <Grid alignContent='center' container spacing={8}>
          <Grid  item xs={4}>                        
          {this.props.previousButton && !this.props.showingASearchResult? (
              <LoadPageButton  label='Prev' load={this.loadPreviousPublications} />
          ) : <div/> }
        </Grid>
        <Grid  item xs={4}>
          {this.props.nextButton && !this.props.showingASearchResult? (            
            <LoadPageButton label='Next' load={this.loadNextPublications} />
            ) : <div/> }
        </Grid>
      </Grid>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return { nextPageQuery: state.pagination.nextPageQuery,
           previousPageQuery: state.pagination.previousPageQuery,
           nextButton: state.pagination.nextButton,
            previousButton:state.pagination.previousButton,
            showingASearchResult: state.showingASearchResult,
            currentAuthor: state.currentAuthor,
            showNewestPublicationsFirst: state.showNewestPublicationsFirst,
        };
};

function mapDispatchToProps(dispatch) {
    return {
      loadNextPublications: nextPageQuery => dispatch(loadNextPublications(nextPageQuery)),
      loadPreviousPublications: previousPageQuery => dispatch(loadPreviousPublications(previousPageQuery)),
      changePublicationsOrder: newestFirst => dispatch(changePublicationsOrder(newestFirst))

    };
  }


export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Publications)
)